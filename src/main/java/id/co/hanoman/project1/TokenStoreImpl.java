package id.co.hanoman.project1;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.springframework.stereotype.Component;

import com.senomas.common.U;

import id.co.hanoman.boot.security.LoginUser;
import id.co.hanoman.boot.security.TokenStore;
import id.co.hanoman.boot.security.model.UserSummary;

@Component
public class TokenStoreImpl implements TokenStore {
	private static final Map<String, LoginUser> users = new HashMap<>();
	private static long cleanUp = 0;
	
	private static long expiry = 300000;

	@Override
	public LoginUser get(String token) {
		synchronized (users) {
			LoginUser loginUser = users.get(token);
			if (loginUser == null) return null;
			if (loginUser.getTimestamp() < System.currentTimeMillis()-expiry) {
				users.remove(token);
				return null;
			}
			loginUser.setTimestamp(System.currentTimeMillis());
			return loginUser;
		}
	}

	@Override
	public LoginUser create(UserSummary user) {
		synchronized (users) {
			if (cleanUp < System.currentTimeMillis()) {
				long tz = System.currentTimeMillis() - expiry;
				for (Iterator<LoginUser> itr = users.values().iterator(); itr.hasNext(); ) {
					LoginUser loginUser = itr.next();
					if (loginUser.getTimestamp() < tz) itr.remove();
				}
			}
			String token = U.randomText(64);
			for (int i=0; i<10000 && users.containsKey(token); i++) {
				token = U.randomText(64);
			}
			if (users.containsKey(token)) throw new RuntimeException("Too many token");
			LoginUser loginUser = new LoginUser(token, user);
			users.put(token, loginUser);
			return loginUser;
		}
	}

	@Override
	public void putSalt(String salt) {
		// not implemented
	}

	@Override
	public boolean hasSalt(String salt) {
		// not implemented
		return true;
	}

}
